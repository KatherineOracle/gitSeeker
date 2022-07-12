import React from "react";
import Commits from '../Commits'
import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer
    .create(<Commits commits={[{"message":"Make URLs relative","committer":"KatherineOracle","date":"2022-02-19T14:31:52Z"}]} dateSettings={{weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}} />)
    .toJSON();
    expect(tree).toMatchSnapshot();
    });
