import React, { useState } from 'react'
import { Pagination } from 'react-bootstrap';

function PaginatedTable({ data = [], itemsPerPage = 5, renderRows }) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = data.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <>
            {renderRows(currentData)}
            <Pagination className="justify-content-center mt-1">
                <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Prev
                </Pagination.Prev>
                {[...Array(totalPages)].map((_, idx) => (
                    <Pagination.Item
                        key={idx + 1}
                        active={currentPage === idx + 1}
                        onClick={() => handlePageChange(idx + 1)}
                    >
                        {idx + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Pagination.Next>
            </Pagination>
        </>
    )
}

export default PaginatedTable