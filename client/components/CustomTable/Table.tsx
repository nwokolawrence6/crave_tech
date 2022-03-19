import React, {ReactElement, ReactNode} from 'react';
import _ from "lodash";
import Loading from "../Loaders/Loading";
import styled from "styled-components";
import {ResponsiveTableStyle} from './TableStyles'
import {ApolloError} from "@apollo/client";
interface ITable {
  columns: object,
  OnRowClick?: (value:object, pageNumber?: number)=> void,
  errorMessage?: string
  rows: Array<object>,
  pageNumber: number,
  loading: boolean,
  totalPages?:number
  headerSection: ReactNode,
  error: ApolloError | boolean | undefined,
  footerSection: ReactNode,
  hasSearch: boolean,
  emptyOnSearch?: string
  emptyInitl?: string
}
const TableDefaultProps = {
}
let keyOne = 1
let keyTwo = 1
function Table(props:ITable & typeof TableDefaultProps) {
 const _head = () => {
    const columns = _.map(props.columns, (colName, key) => {
      return <th key={key}>{colName}</th>;
    });
    return <tr key={keyOne++}>{columns}</tr>;
  };
  const _rows = () => {
    const { OnRowClick } = props;
    return _.map(props.rows, (row:object) => {
      const values = _.map(props.columns, (colName: string, colKey: string) => {
        return (
          <td
            onClick={() => {
              if (props.pageNumber > 1) {
                if (OnRowClick) {
                  !React.isValidElement((row as never)[colKey]) ? OnRowClick(row as object, props.pageNumber) : null;
                }
              } else {
                if (OnRowClick) {
                  !React.isValidElement((row as never)[colKey]) ? OnRowClick((row as object)) : null;
                }
              }
            }}
            key={colKey}
            data-label={colName}
          >
            {(row as never)[colKey]}
          </td>
        );
      });
      return (
        <tr style={{ cursor: props.OnRowClick ? 'pointer' : 'default' }}
          key={keyTwo++}>
          {values}
        </tr>
      );
    });
  };
  if (props.loading)
    return (
      <>
        {props.headerSection ? props.headerSection : null}
        <Loading/>
      </>
    );
  if (props.error) {
    return (
      <div className="error_container">
        {props.headerSection ? props.headerSection : null}
       <span>Error Loading records</span>
      </div>
    );
  }
  if (props.rows.length === 0) {
    return (
      <>
        {props.headerSection ? props.headerSection : null}
        <EmptyMessage>
          {!props.hasSearch ? (
            <>
              {props.emptyInitl ? (
                props.emptyInitl
              ) : (
                <p style={{textAlign: "center"}}>Result not found</p>
              )}
            </>
          ) : (
            <p>
              {props.emptyOnSearch
                ? props.emptyOnSearch
                : 'Result not found'}
            </p>
          )}
          {props.footerSection ? props.footerSection : null}
        </EmptyMessage>
      </>
    );
  }
  return (
    <>
      {props.headerSection ? props.headerSection : null}
      <ResponsiveTableStyle {...props}>
        <thead>{_head()}</thead>
        <tbody>{_rows()}</tbody>
      </ResponsiveTableStyle>
      {props.footerSection ? props.footerSection : null}
    </>
  );
}
Table.propTypes = {

};

const EmptyMessage = styled.div`
  box-shadow: 1px 0.5px 5px rgba(0, 0, 0, 0.08);
  padding: 10px;
`
Table.defaultProps = TableDefaultProps;
export default Table;
