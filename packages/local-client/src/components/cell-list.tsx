import "./cell-list.css";
import { Fragment, useEffect } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { AddCell } from "./add-cell";
import { CellListItem } from "./cell-list-item";
import { useActions } from "../hooks/use-actions";

export const CellList: React.FC = () => {
  const { fetchCells } = useActions();
  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((id) => data[id]);
  });

  useEffect(() => {
    fetchCells();
  }, []);

  const renderedCells = cells.map((c) => (
    <Fragment key={c.id}>
      <CellListItem cell={c}></CellListItem>
      <AddCell previousCellId={c.id} />
    </Fragment>
  ));

  return (
    <div className="cell-list" style={{ padding: "16px" }}>
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  );
};
