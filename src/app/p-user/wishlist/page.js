import UserPanelLayout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/wishlist.module.css";
import Product from "@/components/templates/p-user/wishlist/Product";
import connectToDB from "../../../../configs/db";
import { authUser } from "@/utils/authUser";
import WishlistModel from "../../../../models/Wishlist";
import { redirect } from "next/navigation";

const page = async () => {
  connectToDB();
  const user = await authUser();

  if (user?.role !== 'USER') {
    return redirect('/login-register')
  }

  const wishlist = await WishlistModel.find({ user: user._id }).populate('product', 'name price score image').lean()

  

  return (
    <UserPanelLayout>
      <main>
        <h1 className={styles.title}>
          <span>علاقه مندی ها</span>
        </h1>
        <div className={styles.container}>

          {wishlist.length >0 &&
            wishlist.map((wish) => <Product key={wish._id} {...wish.product} />)}
        </div>

        {!wishlist?.length  && (
          <p className={styles.empty}>محصولی وجود ندارد</p>
        )}
      </main>
    </UserPanelLayout>
  );
};

export default page;
