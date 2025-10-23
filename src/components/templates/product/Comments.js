import Comment from "@/components/modules/comment/Comment";
import styles from "./comments.module.css";
import CommentForm from "./CommentForm";


const Comments =({isLogin,product}) => {
  
  return (
    <div>
      <p>نظرات ({isLogin &&product.comments.filter(comment=>comment.isAccept).length}) </p>
      <hr />

      <main className={styles.comments}>
        <div className={styles.user_comments}>
          <p className={styles.title}>
            {
              product.name
            }
          </p>
          <div>
            {
              isLogin&&
             product.comments.map(comment=>{
              return comment.isAccept&& <Comment key={comment._id} {...comment} />
              })
            }
         
          </div>
        </div>
        <div className={styles.form_bg}>
          <CommentForm isLogin={isLogin} productID={product._id}/>
        </div>
      </main>
    </div>
  );
};

export default Comments;
