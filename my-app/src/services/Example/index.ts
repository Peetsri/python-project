import Axios from "axios";
import { ApiUrl } from "../../config";
import { ValidationHandler } from "../../common/Utils/";
class ServiceExample {
  async callExample(data: any): Promise<any> {
    try {
      const response = await Axios.post(
        `${ApiUrl}`,
        {},
        {
          //   headers: AuthService.getAuthorizationHeader(),
        }
      );
      return await ValidationHandler.handleResponse(response, "addressBook");
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
