import Header from "../../../components/Header/Header";
import Title from "../../../components/Title/Title";
import PersonIcon from "@mui/icons-material/Person";
import EmployeeBottomNavigation from "../EmployeeBottomNavigation/EmployeeBottomNavigation";

export default function EmployeeData() {
  return (
    <>
      <Header selectedPage={"personnel"} />
      <Title
        label="Tomasz Wojtkiewicz: dane"
        icon={<PersonIcon className="color-darker-white" />}
      />
      {/*<EmployeeBottomNavigation saveButtonActive={true} />*/}
    </>
  );
}
