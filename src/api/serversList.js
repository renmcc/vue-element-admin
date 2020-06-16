import request from '@/utils/request'

export function getServersList(listQuery) {
  let after_date = ''
  let before_date = ''
  if (listQuery.datetimeValue == null) {
    listQuery.datetimeValue = []
  }
  if (listQuery.datetimeValue.length > 0) {
    after_date = listQuery.datetimeValue[0]
    before_date = listQuery.datetimeValue[1]
  }
  return request({
    url: `/api/serverInfo/?search=${listQuery.search}&region=${listQuery.region}&project=${listQuery.project}&area=${listQuery.area}&update_time_after=${after_date}&update_time_before=${before_date}&ordering=${listQuery.order}${listQuery.prop}&page=${listQuery.page}&page_size=${listQuery.pageSize}`,
    method: 'get'
  })
}

export function createServers(data, method) {
  return request({
    url: `/api/serverInfo/`,
    method,
    data
  })
}

export function updateServer(ID, data, method) {
  return request({
    url: `/api/serverInfo/${ID}/`,
    method,
    data
  })
}

export function deleteServer(ID) {
  return request({
    url: `/api/serverInfo/${ID}/`,
    method: 'delete'
  })
}
