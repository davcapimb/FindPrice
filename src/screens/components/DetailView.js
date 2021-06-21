import React, { Component } from 'react';
import { View, Text, Image, Platform, StatusBar } from 'react-native';
import CompleteFlatList from 'react-native-complete-flatlist';


const data = [
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Syah', status: 'Active', time: '9:14 PM', date: '1 Dec 2018' },
  { name: 'Izzat', status: 'Active', time: '8:15 PM', date: '1 Jan 2018' },
  { name: 'Ali', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Abu', status: 'Active', time: '8:11 PM', date: '1 Jan 2018' },
  { name: 'Fitri', status: 'Active', time: '8:20 PM', date: '1 Jan 2018' },
  { name: 'Armi', status: 'Active', time: '8:33 PM', date: '1 Jan 2018' },
  { name: 'Eidit', status: 'Active', time: '9:10 PM', date: '1 Jan 2018' },
  { name: 'Hamdan', status: 'Active', time: '10:10 PM', date: '1 Jan 2018' },
  {
    name: 'Muhyiddeen',
    status: 'Blocked',
    time: '10:10 PM',
    date: '9 Feb 2018',
  },
];

export default class DetailView extends Component {
  cell = ({data,index}) => {
    const item = data.cleanData ? data.cleanData : data

    console.log(data.cleanData)
    console.log('data.cleanData will be not null if search bar is not empty and prop highlightColor is not empty. caution, data without search is not same like data with search due to implement the highlight component. data.cleanData is equal to data')

    console.log('this is index number : '+index)

    console.log(item+' this is original data')

    return <Text>{data.name}</Text>;
  }

  render() {
    return (
      <CompleteFlatList
      searchKey={['name', 'status', 'time', 'date']}
      pullToRefreshCallback={() => {
        alert('refreshing');
      }}
      data={data}
      renderSeparator={null}
      renderItem={this.cell}
    />
    );
  }
}
