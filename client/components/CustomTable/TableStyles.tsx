import styled from 'styled-components';
interface IResponsiveTableStyle {
  isNotPadded?:boolean
  separate?: boolean
  bordered?:boolean
  stripes?: boolean
}
export const ResponsiveTableStyle = styled.table<IResponsiveTableStyle>`
  box-shadow: 1px 0.5px 5px rgba(0, 0, 0, 0.08);
  background: #ffffff;
  width: 100%;
  margin: 0;
  //background: #fff;
  padding: ${(props) => (props.isNotPadded ? '17px 0px 0px' : '1em 2em')};
  border-collapse: ${(props) => (props.separate ? 'separate' : null)};
  border-spacing: 0;
  thead {
    visibility: hidden;
    background: #fafafa;
    tr {
      color: #3e3e3e;
      width: 66vw;
    }
  }

  tbody {
    tr {
      transition: 0.2s ease-in-out;

      td {
        font-size: 10px;
      }
    }
    //tr:hover {
    //  background: #eaeaea;
    //  //box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.14);
    //}
  }

  @media screen and (min-width: 600px) {
    thead {
      visibility: visible;
    }
  }
  tr {
    //box-shadow: 1px 2px 5px 0px #aaa;
    background-color: #fff;
    border: ${(props) => props.bordered && '1px solid #ddd'};
    border-bottom: ${(props) => props.bordered && '2px solid #ddd'};
    padding: 7px;
    margin-bottom: 10px;
    display: block;
  }
  @media screen and (min-width: 600px) {
    tr {
      display: table-row;
      border-bottom-width: 1px;
      margin-bottom: 0;
    }
    tr:nth-child(even) {
      background: ${(props) => props.stripes && '#fafafa'};
    }
  }
  th,
  td {
    padding: 10px 0px;
    text-align: left;
  }
  th {
    text-transform: capitalize;
    font-size: 14px;
    font-weight: bolder;
    text-transform: uppercase;
  }
  td {
    display: block;
    text-align: right;
    font-size: 13px;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:first-child td {
    border-top: 1px solid #e0e6f3;
  }
  //td:last-child {
  //  border-bottom: none;
  //}
  @media screen and (min-width: 600px) {
    td {
      display: table-cell;
      text-align: left;
      font-size: 14px;
      border-bottom: 1px solid #e0e6f3;
      padding: 2em 0;
    }
    td:first-child {
    }
  }
  td:before {
    content: attr(data-label);
    float: left;
    text-transform: capitalize;
    font-weight: bold;
  }
  @media screen and (min-width: 600px) {
    td:before {
      content: '';
      display: none;
    }
  }
`;
type paginator = string
export const Paginator = styled.div`
  background: white;
  padding: 1em 5px;
  display: ${({ paginator }: { paginator:paginator }) => (paginator ? 'block' : 'none')};
  ul {
    justify-content: flex-end;
  }
`;

export const EmptyMessage = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  height: 6em;
  background: #ffffff;
  p {
    color:  #000;
  }
`;
interface InterfaceWrapper {
  spaceBetween?: boolean
  center?: boolean
}
export const TableFooterWrapper = styled.div<InterfaceWrapper>`
  display: flex;
  justify-content: ${(props) =>
          props.spaceBetween ? 'space-between' : props.center ? 'center' : ' flex-end'};

  .rc-pagination-item-active {
    background: linear-gradient(270deg, rgb(10, 10, 10) 0%, #000 100%) !important;
    border-color: #000 !important;
  }

  .rc-pagination-item:hover a {
    color: #ffffff !important;
  }

  .rc-pagination li {
    border-color: #000 !important;
  }
`;
interface ITableStyle {
  isNotPadded?: boolean
}
export const TableHeaderWrapper = styled.div<ITableStyle>`
  input:focus {
    outline: none;
  }
  .filter {
    display: flex;
    .p-dropdown {
      margin-right: 10px;
    }
  }
  .p-dropdown-list,
  .p-dropdown-label {
    text-transform: capitalize;
  }
  .search_icon {
    padding-left: 15px;
    padding-right: 15px;
    background: #0b132b;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    right: 10px;
    border-radius: 0 3px 3px 0;
    cursor: pointer;
  }

  .pi-chevron-down {
    display: none;
  }
  button {
    padding: 0;
    margin: 0;
    //background: transparent linear-gradient(90deg, #fd8107 0%, #fd0 100%) 0% 0%
    //  no-repeat padding-box !important;
    border: none;
    width: auto;
    height: auto;
    position: relative;
  }
  background: #fff;
  padding: ${(props) => (props.isNotPadded ? '17px 0px 0px' : '2em 3em 0em 0em')};
  display: flex;
  justify-content: space-between;
  h1 {
    margin-top: 0;
    color: #707070;
  }



  @media (max-width: 820px) {
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    div {
      width: 100%;
      svg {
        top: 0.7em;
      }
    }
  }
`;
