import request from '@/utils/request'

//问卷报表
export function questionnaireData(data) {
  return request({
    url: '/customer/questionnaire/report',
    method: 'post',
    data
  })
}