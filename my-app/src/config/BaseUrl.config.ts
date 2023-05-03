
class UrlEndpoint {
  get staticUrl() {
    return class {
      static get imagePath() {
        return `${process.env.NEXT_PUBLIC_STATIC_FILE_URL}`
      }
    }
  }
}

const endpoint = new UrlEndpoint()
export default endpoint
