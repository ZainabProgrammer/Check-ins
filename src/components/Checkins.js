import React, { useState } from "react";
import styles from "./Checkins.module.css";
import { format } from "date-fns";
import Image from "next/image";
import avatar from "../assets/Avatar-1.png";

const Checkins = ({ data }) => {
  const [detail, setdetail] = useState("");
  const [sorted, setsorted] = useState(false);

  const formatDate = (inputDate) => {
    return format(new Date(inputDate), "do MMMM, yyyy");
  };

  const handleOpen = (value) => {
    const dialog = document.getElementById("modal_detail");
    let openbutton = document.getElementById(value.id);
    openbutton.addEventListener("click", async () => {
      await dialog.show();
    });

    setdetail(value);
  };

  const handleSort = () => {
    setsorted(!sorted);
  };
  return (
    <div>
      <div className={styles.modal}>
        <md-dialog id="modal_detail">
          <form slot="content" id="form-id" method="dialog">
            <div className={styles.modal_wrapper}>
              {detail && (
                <div>
                  <h1>Title</h1>
                  <h3 className={styles.heading}> {detail.txtVal}</h3>
                  <h1 className={styles.heading_sec}>Date Added</h1>
                  <p className={styles.date}>
                    {formatDate(detail.date.toDate())}
                  </p>
                </div>
              )}
            </div>
          </form>
        </md-dialog>
      </div>

      <div className={styles.flex}>
        <h2>Added CheckIns</h2>
        <img onClick={handleSort} src="/menu.png" />
      </div>

      <div className={!sorted ? styles.card_wrapper : styles.flex_col}>
        {data &&
          data.map((value) => (
            <div
              key={value.id}
              className={styles.card}
              onClick={() => handleOpen(value)}
              id={value.id}
            >
              <md-filled-button>Checked In</md-filled-button>
              <img className={styles.card_image} src={value.imgUrl} />
              <div className={styles.card_content}>
                <p>{value.txtVal}</p>
                <div>{formatDate(value.date.toDate())}</div>
                <div className={styles.wrapper}>
                  {" "}
                  <Image src={avatar} width={32} height={32} alt="avatar" />
                  <p>Owner: John Doe</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Checkins;
