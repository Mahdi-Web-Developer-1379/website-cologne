"use client";
import React from "react";
import styles from "@/styles/p-user/tickets.module.css";
import Link from "next/link";
// import Box from "@/components/templates/p-user/tickets/box/Box";
import Ticket from "./Ticket";

function Tickets({ tickets }) {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>
        <span>همه تیکت ها</span>
        <Link href="/p-user/tickets/sendTicket"> ارسال تیکت جدید </Link>
      </h1>

      

      <div>
        {tickets?.map((ticket) => (
              <Ticket key={ticket._id} {...ticket} />
        ))}
      </div>

      {tickets?.length === 0 && (
          <p className={styles.empty}>تیکتی وجود ندارد</p>
      )}
    </main>
  );
}

export default Tickets;
