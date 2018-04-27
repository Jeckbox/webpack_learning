import React, { PureComponent } from 'react';

class First extends PureComponent {
    render() {
        return(
            <div>
                <div>第一页release分支</div>
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

