import React, {Component} from 'react';
import Cell from './cell';
import sprite from '../images/green.jpg';

export default class Board extends Component {
  state = {
      count:1,
        zero: '',
        possibleTopIdx: '',
        possiblRightIdx: '',
        possiblBottomIdx: '',
        possibleLeftIdx: ''
    };
    componentWillMount() {
        this.findClickables(this.props.board, this.props.size);
    }
    componentWillReceiveProps(nextProps) {
        this.findClickables(nextProps.board, nextProps.size);
    }
    shouldComponentUpdate(nextProps) {
        const curr = this
            .props
            .board
            .join('');
        const next = nextProps
            .board
            .join('');
        return curr !== next;
    }

    findClickables = (board, size) => {
        const zeroIndex = board.indexOf(0);
        const zeroCoordinate = this.getCoordFromIndex(zeroIndex, size);
        const possibleTopIdx = zeroCoordinate.row > 0
            ? this.getIndexFromCoord(zeroCoordinate.row - 1, zeroCoordinate.column, size)
            : null;
        const possiblRightIdx = zeroCoordinate.column < size
            ? this.getIndexFromCoord(zeroCoordinate.row, zeroCoordinate.column + 1, size)
            : null;
        const possiblBottomIdx = zeroCoordinate.row < size
            ? this.getIndexFromCoord(zeroCoordinate.row + 1, zeroCoordinate.column, size)
            : null;
        const possibleLeftIdx = zeroCoordinate.column > 0
            ? this.getIndexFromCoord(zeroCoordinate.row, zeroCoordinate.column - 1, size)
            : null;

        this.setState({zero: zeroIndex, possibleTopIdx: possibleTopIdx, possiblRightIdx: possiblRightIdx, possiblBottomIdx: possiblBottomIdx, possibleLeftIdx: possibleLeftIdx});
    }
    getCoordFromIndex = (idx, size) => {
        return {
            row: Math.floor(idx / size) + 1,
            column: (idx % size) + 1
        };
    }
    getIndexFromCoord = (row, col, size) => {
        return (size * (row - 1)) + col - 1;
    }
    cellClickHandler = (index) => {
        if (index === this.state.possibleTopIdx || index === this.state.possiblRightIdx || index === this.state.possiblBottomIdx || index === this.state.possibleLeftIdx) 
            this.nextBoard(index);
        }
  nextBoard = (index) => {
    this.setState({ count: this.state.count + 1 })

        const indexx = this.props.sprite.indexOf(index)
        if (indexx > -1) {
          this.props.sprite.splice(indexx, 1)
        }
        if (this.props.sprite.length === 0) {
          alert(`Game Over. Total moves to save bae: ${this.state.count}`)
          window.location.href = '/'
        }

        // console.log(this.props.sprite)
        const board = this
            .props
            .board
            .slice();
        const temp = board[index];
        board[index] = board[this.state.zero];
        board[this.state.zero] = temp;
        this
            .props
            .updateBoard(board);
    }
    render() {
        const squares = this
            .props
            .board
            .map((val, index) => {

                if ((index + 1) % this.props.size === 0) {
                    if (this.props.sprite.includes(val)) {
                        return (
                            <span key={'i' + index}>
                              <img
                        key={index}   
                              alt='sprite'
                      style={{width:60,height:60}}
                       src={sprite}
                        onClick={() => this.cellClickHandler(index)} />
                                <br/>
                            </span>
                        )
                    } else {
                        return (
                            <span key={'i' + index}>
                                {< Cell key = {
                                    index
                                }
                                value = {
                                    val
                                }
                                sprite = {
                                    this.props.sprite
                                }
                                clickHandler = {
                                    () => this.cellClickHandler(index)
                                } />}
                                <br/>
                            </span>
                        );
                    }

                }
                if (this.props.sprite.includes(val)) {
                    return (<img
                      key={index}
                      alt='sprite'
                      style={{width:60,height:60}}
                      src={sprite}
                      onClick={() => this.cellClickHandler(index)} />
                      )
                } else {
                    return <Cell
                        key={index}
                        value={val}
                        clickHandler={() => this.cellClickHandler(index)}/>;
                }

            });
        return (
            <div className='board'>
                {squares}
            </div>
        );
    }
}
