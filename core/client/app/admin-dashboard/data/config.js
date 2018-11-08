import moment from 'moment'

module.exports = {
    DATE_RANGER: {
        'Hôm nay' : [
            moment(), 
            moment()
        ],
        'Hôm qua': [
            moment().subtract(1, 'days'), 
            moment().subtract(1, 'days')
        ],
        '7 ngày gần đây': [
            moment().subtract(6, 'days'), 
            moment()
        ],
        '30 ngày gần đây': [
            moment().subtract(29, 'days'),
             moment()
        ],
        'Tháng này': [
            moment().startOf('month'), 
            moment()
        ],
        'Tháng trước': [
            moment().subtract(1, 'month').startOf('month'), 
            moment().subtract(1, 'month').endOf('month')
        ]
    }
}