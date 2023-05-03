import axios, { AxiosResponse } from "axios";
/* eslint-disable camelcase */

import { ServerResponse, IncomingMessage } from "http";

const axiosApiInstance = axios.create();
class MessagePicker {
  get store(): any {
    return class {
      static get unauthorized(): string {
        return "กรุณาเข้าสู่ระบบก่อนใช้งาน";
      }

      static get forbidden_resource(): string {
        return "สิทธิ์การใช้งานไม่ถูกต้อง กรุณาติดต่อเจ้าหน้าที่";
      }
    };
  }
}

class ValidationHandler extends MessagePicker {
  pickMessage(code: string) {
    const message = this.store[code];
    return message;
  }

  async handleResponse(
    response: AxiosResponse,
    key: string,
    req?: IncomingMessage,
    res?: ServerResponse,
    pathname?: string
  ) {
    if (response.data.data) {
      return response.data.data[key];
    } else {
      const errorCode = response.data.errors[0].codes[0];
      const responseMessage = this.pickMessage(errorCode);
      throw new Error(responseMessage || errorCode);
    }
  }
}

const handler = new ValidationHandler();
export default handler;
