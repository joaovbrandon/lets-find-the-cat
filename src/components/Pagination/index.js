import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { HelperService } from '../../services';
import { useMetrics } from '../../hooks';
import {
  Container, PageNumber, CurrentPage, MorePages,
} from './styles';

function Pagination({
  totalPages, currentPage, history, location,
}) {
  const metrics = useMetrics();
  const [offset, setOffset] = useState(4);

  useEffect(() => {
    if (metrics.isXS) {
      setOffset(3);
    } else {
      setOffset(4);
    }
  }, [metrics, setOffset]);

  const goToPage = (pageNumber) => {
    HelperService.scrollToTop();

    const params = queryString.parse(location.search);
    params.page = pageNumber;

    history.push({
      ...location,
      search: queryString.stringify(params),
    });
  };

  const renderPageNumber = pageNumber => (
    <PageNumber
      key={pageNumber}
      type="button"
      onClick={() => goToPage(pageNumber)}
    >
      {pageNumber}
    </PageNumber>
  );

  const renderPrevious = () => {
    const previous = [];

    for (
      let pageNumber = currentPage - 1;
      pageNumber >= currentPage - (offset - 1) && pageNumber > 1;
      pageNumber -= 1
    ) {
      previous.push(renderPageNumber(pageNumber));
    }

    if (currentPage - offset > 1) previous.push(<MorePages key="morePreviousPages">...</MorePages>);
    if (currentPage > 1) previous.push(renderPageNumber(1));

    return previous.reverse();
  };

  const renderNext = () => {
    const next = [];

    for (
      let pageNumber = currentPage + 1;
      pageNumber <= currentPage + (offset - 1) && pageNumber < totalPages;
      pageNumber += 1
    ) {
      next.push(renderPageNumber(pageNumber));
    }

    if (currentPage + offset < totalPages) next.push(<MorePages key="moreNextPages">...</MorePages>);
    if (currentPage < totalPages) next.push(renderPageNumber(totalPages));

    return next;
  };

  return (
    <>
      {
        totalPages > 1 && (
          <Container>
            {renderPrevious()}
            <CurrentPage>{currentPage}</CurrentPage>
            {renderNext()}
          </Container>
        )
      }
    </>
  );
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(Pagination);
