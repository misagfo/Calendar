import React, { Component } from 'react'
import classnames from 'classnames'
import * as  calendar from './Calendar'
import './index.css'

export default class Calendar extends Component {
  static defaultProps = {
      date: new Date(),
      years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
      monthName: ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'],
      weekDaysName: ['Lun', 'Mar', 'Mer', 'Joi', 'Vin', 'Sam', 'Dum'],
      onChange: Function.prototype
  }
    
   state = {
       date: this.props.date,
       currentDate: new Date(),
       selectedDate: null
   }

   get year(){
       return this.state.date.getFullYear()
   }
   get month(){
       return this.state.date.getMonth()
}
   get day(){
       return this.state.date.getDate()
}

   handlePrevMonthButtonClick = () => {
       const date = new Date(this.year, this.month - 1)
       this.setState({ date })
   }

   handleNextMonthButtonClick = () => {
       const date = new Date(this.year, this.month + 1)
       this.setState({ date })
 }

   handleSelectChange = () => {
       const year = this.yearSelect.value
       const month = this.monthSelect.value

       const date = new Date(year, month)
       this.setState({ date })
   }

   handelDayClick = date => {
       this.setState({ selectedDate: date })
       this.props.onChange(date)
   }


    render() {
        const { years, monthName, weekDaysName } = this.props
        const { currentDate, selectedDate } = this.props

        const monthData = calendar.getMonthData(this.year, this.month)
    
        return (
            <div className="calendar">
                <header>
                  <button onClick={this.handlePrevMonthButtonClick}>{'<-'}</button>

                  <select ref={element => this.monthSelect = element}
                          value={this.month}
                          onChange={this.handleSelectChange}
                     >
                      {monthName.map((name, index) => 
                          <option key={name} value={index}>{name}</option>
                      )}
                  </select>

                  <select ref={element => this.yearSelect = element} 
                        defaultValue={this.year}
                        onChange={this.handleSelectChange}
                 >
                      {years.map(year => 
                          <option key={year} value={year}>{year}</option>)}
                  </select>

                  <button onClick={this.handleNextMonthButtonClick}>{'->'}</button>
                </header>

                <table>
                    <thead>
                        <tr>
                            {weekDaysName.map(days => 
                                <th key={days}>{days}</th>
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        {monthData.map((week, index) => 
                              <tr key={index} className='week'>
                                  {week.map((date, index) => date ? 
                                   <td key={index} 
                                   className={classnames('day', {
                                       'today': calendar.areEqual(date, currentDate),
                                       'selected' : calendar.areEqual(date, selectedDate)
                                   })}
                                   onClick={() => this.handelDayClick(date)}
                                   className='days'>{date.getDate()}</td> :
                                   <td key={index}></td>
                                  )}
                              </tr>
                            )}
                    </tbody>
                </table>
            </div>
        )
    }
}
