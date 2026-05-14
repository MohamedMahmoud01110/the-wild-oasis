import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";
import { useEffect, useState } from "react";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
function Cabins() {
  const [showForm, setShowForm] = useState(false);
  useEffect(function () {
    getCabins().then((data) => console.log(data));
  }, []);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={() => setShowForm((show) => !show)}>Add cabin</Button>
        {showForm && <CreateCabinForm setShowForm={setShowForm} />}
      </Row>
    </>
  );
}

export default Cabins;
