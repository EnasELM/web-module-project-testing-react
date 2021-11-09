import React from 'react';
import { render, screen ,waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Display from '../Display';
import mockFetchShow from './../../api/fetchShow';
jest.mock('./../../api/fetchShow');

const testShow = {
    name:"show" ,
    summary:"test",
    seasons:[
        {
            id:1,
            name:'season1',
            episodes:[]
        },
        {
          id:2,
          name:'season2',
          episodes:[]
      }
    ]
  }

test('renders without errors',()=> {
    render(<Display/>)
})

test('renders image with button if show is false', ()=> {
    //Arrange: Renders our component with show === false
    render(<Display show={false}/>);

    const img = screen.queryByAltText("header image");
    const button = screen.queryByRole('button');

    
    expect(img).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    
});
test('renders image with button if show is true', ()=> {
    //Arrange: Renders our component with show === true
    render(<Display show={true}/>);

    const img = screen.queryByAltText("header image");
    const messageButton = screen.queryByText(/Press to Get Show Data/i);
    
    
    
    expect(img).toBeInTheDocument();
    expect(messageButton).toBeInTheDocument();

    
});

test('executes getData if button is clicked', async ()=> {
    mockFetchShow.mockResolvedValueOnce(testShow);
    render(<Display />);
    const button = screen.queryByRole("button");
    userEvent.click(button);
    const show = await screen.findByTestId('show-container');
    expect(show).toBeInTheDocument();
   
});
test('executes getData if button is clicked', async ()=> {
    mockFetchShow.mockResolvedValueOnce(testShow);
    render(<Display />);
    const button = screen.queryByRole("button");
    userEvent.click(button);
    await waitFor(()=>{
        const seasonOption = screen.queryAllByTestId("season-option");
        expect(seasonOption).toHaveLength(2);
    }
    )
}
)
test('displayFunc is called when the  fetch button is presses', async ()=> {
    mockFetchShow.mockResolvedValueOnce(testShow);
    const displayFun = jest.fn();

    render(<Display displayFun={displayFun} />);
    const button = screen.queryByRole("button");
    userEvent.click(button);
    await waitFor(()=> {
        expect(displayFun).toHaveBeenCalled();
    }
        )

})



///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.