import styles from "./answer.module.css";

const Answer = ({ type,ticket,name }) => {
//  console.log({ticket});
  return (
    <section
      className={type == "user" ? styles.userTicket : styles.adminticket}
    >
      <div className={styles.ticket_main}>
        <p>{new Date(ticket.createdAt).toLocaleDateString("fa-IR")}</p>
        <div>
          <div>
            <p>{name ? name: ''}</p>
            <span>{type}</span>
          </div>
          <img src="/images/commentuser.png" alt="" />
        </div>
      </div>
      <div className={styles.ticket_text}>
        <p>{ticket.body}</p>
      </div>
    </section>
  );
};

export default Answer;
