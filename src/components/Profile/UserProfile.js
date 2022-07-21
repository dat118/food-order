import ProfileForm from "./ProfileForm";
import classes from "./UserProfile.module.css";
import OrderHistory from "./OrderHistory";
const UserProfile = () => {
  return (
    <section className={classes.profile}>
      <h2>Your User Profile</h2>
      <ProfileForm />
      <h3>Order history</h3>
      <OrderHistory />
    </section>
  );
};

export default UserProfile;
