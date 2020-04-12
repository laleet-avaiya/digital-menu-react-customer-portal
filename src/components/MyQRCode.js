import React, { Component } from "react";
import QRCode from "qrcode.react";

export default class MyQRCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props,
      qr_code_url:
        "https://practical-ritchie-dd48fb.netlify.com/?restaurant_id=" +
        this.props.user.uid,
    };
    this.downloadQR = this.downloadQR.bind(this);
  }

  downloadQR() {
    const canvas = document.getElementById("qr-code");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = this.state.user.uid + ".png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  render() {
    var { qr_code_url } = this.state;

    return (
      <div className="qr-code">
        <QRCode
          className="qr-code-box"
          id="qr-code"
          value={qr_code_url}
          size={290}
          level={"H"}
          includeMargin={true}
        />
        <br />
        <button
          type="button"
          className="btn bg-warning  my-3"
          onClick={() => this.downloadQR()}
        >
          Download QR
        </button>
      </div>
    );
  }
}
