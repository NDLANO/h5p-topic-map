import * as React from "react";
import { Grid } from "./components/Grid/Grid";
import { TopicMapItemType } from "./types/TopicMapItemType";

export type AppProps = {
  items: Array<TopicMapItemType>;
};

const App: React.FC<AppProps> = ({ items }) => {
  return (
    <>
      <Grid items={items} />
    </>
  );
};

export default App;
