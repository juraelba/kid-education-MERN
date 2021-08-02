import React from 'react';
import {
    Pagination,
    PaginationItem,
    PaginationLink,
    } from "reactstrap";

export default function PaginationComponent({prev, pageNumbers, currentPage, last, handleFirstClick, handleClick, handleLastClick}) {
    return(
        <ul id="page-numbers">
            <nav>
                <Pagination>
                    <PaginationItem>
                    { prev === 0 ? <PaginationLink disabled>First</PaginationLink> :
                        <PaginationLink onClick={handleFirstClick} id={prev} href={prev}>First</PaginationLink>
                    }
                    </PaginationItem>
                    <PaginationItem>
                    { prev === 0 ? <PaginationLink disabled>Prev</PaginationLink> :
                        <PaginationLink onClick={handleClick} id={prev} href={prev}>Prev</PaginationLink>
                    }
                    </PaginationItem>
                        {
                        pageNumbers.map((number,i) =>
                        <Pagination key= {i}>
                        <PaginationItem active = {pageNumbers[currentPage-1] === (number) ? true : false} >
                        <PaginationLink onClick={handleClick} href={number} key={number} id={number}>
                        {number}
                        </PaginationLink>
                        </PaginationItem>
                        </Pagination>
                        )}

                    <PaginationItem>
                    {
                    currentPage === last ? <PaginationLink disabled>Next</PaginationLink> :
                    <PaginationLink onClick={handleClick} id={pageNumbers[currentPage]} href={pageNumbers[currentPage]}>Next</PaginationLink>
                    }
                    </PaginationItem>

                    <PaginationItem>
                    {
                    currentPage === last ? <PaginationLink disabled>Last</PaginationLink> :
                    <PaginationLink onClick={handleLastClick} id={pageNumbers[currentPage]} href={pageNumbers[currentPage]}>Last</PaginationLink>
                    }
                    </PaginationItem>
                </Pagination>
            </nav>
        </ul>
    )
}

