import main from './app'
import { configuration } from './config/configuration'

main(configuration.port).catch((err: any) => console.log(err))
