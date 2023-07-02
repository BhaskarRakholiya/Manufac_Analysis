import React, { useMemo } from "react";
import { groupWinesByAlcohol } from "./utils/commonFunctions";
import Table from "./components/Table";
import { IDENTIFICATION_KEY, GAMMA } from "./utils/constants";

function App() {
  const formattedAlcoholByClass = useMemo(() => groupWinesByAlcohol(), []);
  return (
    <div className="App">
      <Table data={formattedAlcoholByClass} operationKey={IDENTIFICATION_KEY} />
      <Table data={formattedAlcoholByClass} operationKey={GAMMA} />
    </div>
  );
}

export default App;
