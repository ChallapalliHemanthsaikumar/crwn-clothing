import  { connect} from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { selectCollectionFetching } from '../../redux/shop/shop.selector';
import { compose } from 'redux';
import withSpinner from '../with-spinner/with-spinner.component';

import CollectionsOverview from './collections-overview.component';

const mapStateToProps = createStructuredSelector({
    isLoading: selectCollectionFetching
});

const collectionsOverviewContainer = compose(
    connect(mapStateToProps),
    withSpinner)
(CollectionsOverview);

export default collectionsOverviewContainer;

