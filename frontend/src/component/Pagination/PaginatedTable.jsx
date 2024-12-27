import React, { useState } from 'react'
import { Pagination } from 'react-bootstrap';

function PaginatedTable({ data = [], itemsPerPage = 5, renderRows }) {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate pagination values
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = data.slice(startIndex, startIndex + itemsPerPage)

    // Handle Previous
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    }

    return (
        <>
            {renderRows(currentData, currentPage, itemsPerPage)}
            <Pagination>
                <Pagination.Prev disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Prev</Pagination.Prev>
                {[...Array(totalPages)].map((_, idx) => (
                    <Pagination.Item
                        key={idx + 1}
                        active={currentPage === idx + 1}
                        onClick={() => handlePageChange(idx + 1)}
                    >
                        {idx + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</Pagination.Next>
            </Pagination>
        </>
    )
}

export default PaginatedTable