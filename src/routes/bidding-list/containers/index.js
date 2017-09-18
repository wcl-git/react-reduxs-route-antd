import { connect } from 'react-redux'
import { getPlaceInfo, delPlaceInfoById, switchPlaceType } from '../modules'
import dumbComp from '../components'

const mapStateToProps = (state, ownProps = {}) => {
  const { layout, biddingList } = state
  return {
    tableList: biddingList.tableList,
    total: biddingList.total,
    placeType: biddingList.placeType
  }
}

const mapDispatchToProps = {
  switchPlaceType: type => switchPlaceType(type),
  loadPlace: params => getPlaceInfo(params),
  removePlaceItem: params => delPlaceInfoById(params)
}

export default connect(mapStateToProps, mapDispatchToProps)(dumbComp)
