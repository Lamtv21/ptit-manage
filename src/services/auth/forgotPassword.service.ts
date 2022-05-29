import httpStatus from 'http-status'
import { findOneUserByEmail } from '../../repository/user.repository'
import ApiError from '../../utils/apiError'
import { v4 } from 'uuid'
import { FREFIX_RESET_TOKEN_PASSWORD } from '../../constant/prefix.redis'
import sendEmail from '../email/send.email'
import { configuration } from '../../config/configuration'

const forgotPasswordService = async (email: string, redisClient: any) => {
  const foundUser = await findOneUserByEmail(email)

  if (!foundUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'The account is not exist in the system!')
  }

  const resetToken = v4()

  //set reset token with time = 15p  in redis
  await redisClient.set(`${FREFIX_RESET_TOKEN_PASSWORD}${foundUser.id}`, resetToken, { EX: 15 * 60 })

  //user click to this url, send query to server
  const resetUrl = `http://localhost:3000/resetpassword?token=${resetToken}&userId=${foundUser.id}`
  const message = `
      <h1>Bạn có yêu cầu thay đổi mật khẩu ^.^</h1>
      <h2>Nếu như không phải bạn yêu cầu thay đổi mật khẩu, hãy bỏ qua gmail này. Nếu như bạn muốn thay đổi mật khẩu hãy click vào link bên dưới (sau 15 phút link sẽ không còn giá trị sử dụng)</h2>
      <a href=${resetUrl} clicktacking=off>${resetUrl}</a>
    `

  //send email to user
  sendEmail({ to: foundUser.email, html: message })
}

export default forgotPasswordService
