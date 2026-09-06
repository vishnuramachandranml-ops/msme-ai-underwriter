import NewAssessmentButton from "./NewAssessmentButton";
import NotificationButton from "./NotificationButton";
import UserProfile from "./UserProfile";

const NavbarActions = () => {
  return (
    <div className="flex items-center gap-3">
      <NewAssessmentButton />

      <NotificationButton count={3} />

      <UserProfile />
    </div>
  );
};

export default NavbarActions;