import React, {useState} from 'react';
import Pagination from 'rc-pagination'
import styled from "styled-components";
import ResponsiveTable from '../../CustomTable/Table'
import {gql, useQuery} from "@apollo/client";
import {TableFooterWrapper, TableHeaderWrapper} from "../../CustomTable/TableStyles";
import {useRouter} from "next/router";

interface IPagination {
  current: number
  onChange?: ((page: number, pageSize: number) => void) | undefined
  totalDocs: number
  numberPerPage: number
}

const cols = {
  name: 'Company Name',
  address: 'Address',
  createdAt: "Date Created"
};
const TableHeader = () => {
  return (
    <TableHeaderWrapper>
      <h2>Companies</h2>
    </TableHeaderWrapper>
  );
};
const TableFooter = ({current, onChange, totalDocs, numberPerPage}: IPagination) => {
  return (
    <TableFooterWrapper>
      <Pagination
        current={current}
        onChange={onChange}
        total={totalDocs}
        pageSize={numberPerPage}
        defaultPageSize={numberPerPage}
      />
    </TableFooterWrapper>
  );
};
export const getAllCompanyGql = gql`
    query getAllCompany(
        $page: Int!
    ) {
        getAllCompany (page:$page) {
            docs {
                _id
                name
                address
                createdAt
            }
            totalPages
        }
    }
`

const GetCompanyList = () => {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const {loading, error, data} = useQuery(getAllCompanyGql, {
    variables: {page}
  })

  return (
    <Container>
      <ResponsiveTable
        loading={loading}
        error={error}
        pageNumber={page}
        hasSearch={false}
        columns={cols}
        OnRowClick={(value: any) => {
          router.push({pathname: `/dashboard/progress/${value._id}`})
        }}
        rows={data?.getAllCompany.docs}
        headerSection={<TableHeader/>}
        footerSection={
          <TableFooter
            current={1}
            numberPerPage={5}
            onChange={(e) => {
              setPage(e)
            }}
            totalDocs={
              loading
                ? 0
                : error
                  ? 0
                  : 0
            }
          />
        }
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`


export default GetCompanyList;
