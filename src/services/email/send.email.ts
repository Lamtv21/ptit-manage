import nodemailer from 'nodemailer'
import { configuration } from '../../config/configuration'

const sendEmail = async (options: { to: string; html: string }) => {
  const tranposter = nodemailer.createTransport({
    service: configuration.email.service,
    auth: {
      user: configuration.email.username,
      pass: configuration.email.password
    }
  })

  const mailOptions = {
    from: configuration.email.username,
    to: options.to,
    subject: 'Anh bạn à. Có vẻ như anh bạn bị quên mật khẩu :D',
    html: options.html
  }

  tranposter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else console.log(info)
  })
}

export default sendEmail
