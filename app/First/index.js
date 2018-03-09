import React, { PureComponent } from 'react';

class First extends PureComponent {
    render() {
        return(
            <div>
                <div>第一aaa页</div>
                <button
                    onClick={() => {
                        this.props.history.push('/second');
                    }}
                >下一页</button>
            </div>
        );
    }
}

export default  First;

