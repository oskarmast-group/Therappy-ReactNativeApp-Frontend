interface FileInterface {
  uri: string;
  type: string;
  name: string;
}

class File implements FileInterface {
  uri: string;
  type: string;
  name: string;

  constructor(uri: string, type: string, name: string) {
    this.uri = uri;
    this.type = type;
    this.name = name;
  }
}

export default File;
