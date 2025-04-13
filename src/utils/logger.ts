import chalk from "chalk";

function loggerTimestamp(){
  return chalk.hex("#80a0c2")(`[${new Date().toLocaleString()}]`)
}

function loggerFormatter(text: string, bgColor: string, textColor: string) {
  return chalk.bgHex(bgColor).hex(textColor)(`[${text.toUpperCase()}]`)
}


export const logger = {
  info: (message: string) => {
    console.log(`${loggerTimestamp()} ${loggerFormatter('info', '#056a80', '#ffffff')} ${message}`)
  },
  success: (message: string) => {
    console.log(`${loggerTimestamp()} ${loggerFormatter('success', '#04b816', '#ffffff')} ${message}`)
  },
  warn: (message: string) => {
    console.warn(`${loggerTimestamp()} ${loggerFormatter('warn', '#d1b208', '#ffffff')} ${message}`)
  },
  error: (message: string) => {
    console.error(`${loggerTimestamp()} ${loggerFormatter('error', '#ad0320', '#ffffff')} ${message}`)
  }
}