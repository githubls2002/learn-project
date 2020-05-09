import React, { Component } from 'react'
import { Table, Button, message } from 'antd'
import { connect } from 'react-redux'
import { dataSetSaveEdit } from 'store/data-set/actions'
import { getDataSources } from 'store/data-source/actions'
import intl from 'src/intl'

class DetailChange extends Component {
  static propTypes = {
    id: React.PropTypes.string,
    dispatch: React.PropTypes.func,
    detailChange: React.PropTypes.object,
    keysList: React.PropTypes.object,
    dataSet: React.PropTypes.object,
    setInfo: React.PropTypes.object,
    states: React.PropTypes.object,
    secPrev: React.PropTypes.func,
    onSuccess: React.PropTypes.func,
    handleHideModal: React.PropTypes.func,
  }

  constructor() {
    super()
    this.state = {
      page: 1,
      loading: false,
      saveLoading: false,
      open: false,
      checkedList: null
    }
  }

  // 配置table
  parseColumns(columns) {
    if (columns) {
      return columns.map((col) => {
        return {
          key: col,
          title: col.length > 13 ? <span title={col}>{col.substring(0, 13) + '...'}</span> : col,
          dataIndex: col,
          width: columns.length < 7 ? 728 / columns.length : 112
        }
      })
    }

    return []
  }

  // 配置table表格
  parse(data) {
    let columns = []
    let dataSource = []

    // 刚开始数据有时会取不到，所以要判断data存不存在
    if (data && Object.keys(data).length) {

      // 判断每个字段数据条数并填充空数据
      let fillinEmptyValueFields = {
        ...data[0]
      }
      Object.keys(fillinEmptyValueFields).map((index) => {
        fillinEmptyValueFields[index] = ''
      })

      if (this.state.checkedList) {

        columns = this.parseColumns(this.state.checkedList)

        if (columns.length === 0) {
          let a = []
          for (let len2 = 0; len2 < 10; len2++) {
            a.push(fillinEmptyValueFields)
          }

          dataSource = a
        } else {
          for (let len1 = data.length % 10; len1 > 0 && len1 < 10; len1++) {
            data.push(fillinEmptyValueFields)
          }

          dataSource = data
        }

      } else {
        columns = this.parseColumns(Object.keys(data[0]))

        for (let len1 = data.length % 10; len1 > 0 && len1 < 10; len1++) {
          data.push(fillinEmptyValueFields)
        }

        dataSource = data
      }
    }

    return {
      columns,
      dataSource
    }

  }

  onChange(checkedValues) {
    this.setState({
      checkedList: checkedValues
    })

    this.parse()
  }

  render() {
    let {
      detailChange
    } = this.props
    let {
      dataSource,
      columns
    } = this.parse(this.props.detailChange.collection)

    // 配置分页器
    const pagination = {
      total: detailChange.total,
      // showTotal: total => `Total ${total} items`,
      pageSize: 10,
      defaultCurrent: 1
    }

    return (
      <div>
        { this.state.loading
          ?
          <div className="data-loading">
            <p className="title">{intl.formatMessage({ id:'is going to get the data',
              defaultMeseeage:'正在玩命获取数据,请稍后……' })}</p>
            <div className="spinner ">
              <div className="spinner-blade"/>
              <div className="spinner-blade"/>
              <div className="spinner-blade"/>
            </div>
          </div>
          :
          <div className="detail">
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={pagination}
              locale={ { emptyText: intl.formatMessage({ id: 'no data', defaultMeseeage: '暂无数据' }) } }
              scroll={{ x: columns.length * 112 }}
            />

            <div className="btn-group-vertical">
              <Button type="primary" onClick={this.props.secPrev}>
                { intl.formatMessage({ id: 'previous', defaultMessage: '上一步' }) }
              </Button>
              <Button type="primary" loading={this.state.saveLoading} onClick={this.save.bind(this, this.props.id)}
                disabled={this.state.open} >
                { intl.formatMessage({ id: 'save', defaultMessage: '保存' }) }
              </Button>
            </div>

          </div>
        }
      </div>
    )
  }

  save(id) {
    this.setState({
      saveLoading: true
    })
    let dataSet = this.props.dataSet
    dataSet.dataSourceId = dataSet.id
    if (dataSet.apiSupportTime === true) {
      dataSet.supportTime = dataSet.apiSupportTime
    }
    this.props.dispatch(
      dataSetSaveEdit(dataSet, id)
    ).then(() => {
      this.props.dispatch(getDataSources())
      if (this.props.onSuccess) {
        this.props.onSuccess()
      }
      this.setState({
        saveLoading: false,
        open: true
      })
      this.props.handleHideModal()
    })
      .catch(() => {
        message.error(intl.formatMessage({ id:'saving data set failed',defaultMeseeage:'保存数据集失败' }))
        this.setState({
          saveLoading: false,
          open: true
        })
        this.props.handleHideModal()
      })

    // this.props.handleHideModal()
  }

}

const mapStateToProps = (state) => {
  let {
    detailChange,
    setInfo
  } = state.dataSet

  return {
    detailChange,
    setInfo
  }
}
export default connect(mapStateToProps)(DetailChange)
