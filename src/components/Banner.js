import React, { useEffect, useRef, useState } from "react";
import { imgDB, txtDB } from "@/firebase.config";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";
import Checkins from "./Checkins";
import styles from "./Banner.module.css";
import "@material/web/dialog/dialog";
import "@material/web/button/text-button";

function Banner() {
  const [txt, setTxt] = useState("");
  const [img, setImg] = useState("");
  const [data, setData] = useState([]);

  const handleAdd = () => {
    const dialog = document.getElementById("modal");
    let openbutton = document.getElementById("open");
    openbutton.addEventListener("click", async () => {
      await dialog.show();
    });
  };
  const handleUpload = (e) => {
    console.log(e.target.files[0]);
    const imgs = ref(imgDB, `Imgs/${v4()}`);
    uploadBytes(imgs, e.target.files[0]).then((data) => {
      console.log(data, "imgs");
      getDownloadURL(data.ref).then((val) => {
        setImg(val);
      });
    });
  };

  const handleClick = async () => {
    if (img.trim() === "" || txt.trim() === "") {
      return;
    } else {
      const valRef = collection(txtDB, "txtData");
      await addDoc(valRef, { txtVal: txt, imgUrl: img, date: new Date() });
      alert("Data added successfully");
      window.location.reload();
    }
  };

  const getData = async () => {
    const valRef = collection(txtDB, "txtData");
    const dataDb = await getDocs(valRef);
    const allData = dataDb.docs.map((val) => ({ ...val.data(), id: val.id }));
    setData(allData);
  };

  useEffect(() => {
    getData();
  }, [data]);

  const fileInputRef = useRef(null);
  const handleClickImage = () => {
    // Trigger the file input when the image is clicked
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <div>
        <div className={styles.main}>
          <div className={styles.banner}>
            <img src="/banner.png" />
            <div className={styles.content_wrapper}>
              <div className={styles.content}>
                <h1>Hi! 👋 James Doe</h1>
                <p>
                  Lorem ipsus dolor sit amen, something important to say here
                </p>
              </div>
            </div>
          </div>
          <md-filled-button id="open" onClick={handleAdd}>
            Add Check In
          </md-filled-button>
          <div className={styles.modal}>
            <md-dialog id="modal">
              <form slot="content" id="form-id" method="dialog">
                <div className={styles.modal_wrapper}>
                  <p className={styles.alert}>
                    If clicking on add button not show alert box of successfull
                    adding CheckIn to database please try adding once more
                  </p>
                  <h3 className={styles.add}>Add Check In</h3>

                  <h3>Title</h3>
                  <input
                    placeholder="Enter Title"
                    onChange={(e) => setTxt(e.target.value)}
                  />
                  <br />

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => handleUpload(e)}
                    style={{ display: "none" }}
                  />
                  <br />
                  <h3>Upload Image</h3>
                  <img
                    src="/drag.png"
                    onClick={handleClickImage}
                    style={{
                      cursor: "pointer",
                      marginTop: "1rem",
                      width: "100%",
                    }}
                  />
                  <br />
                  <br />
                </div>
              </form>
              <div slot="actions">
                <md-text-button form="form-id" onClick={handleClick}>
                  Add
                </md-text-button>
                <md-text-button form="form-id">Cancel</md-text-button>
              </div>
            </md-dialog>
          </div>
        </div>
      </div>

      <Checkins data={data} />
    </div>
  );
}
export default Banner;
