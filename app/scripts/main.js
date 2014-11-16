var CommentFeedbackPage = React.createClass({
    render: function() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col col-xs-12 current-time">
                        <p className="text-center">11:23 a.m.</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col col-xs-12">
                        <div className="progress">
                            <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{"width": "60%"}}>
                                <span className="sr-only">60% Complete</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <UnderStandButton commentType={'SUCCESS'} />
                    <UnderStandButton commentType={'WARNING'} />
                    <UnderStandButton commentType={'FAILURE'} />
                </div>

                <div className="row comment-row">
                    <div className="col-xs-12">
                        <form className="form-horizontal" role="form">
                            <textarea className="form-control" rows="3" placeholder="Enter a comment!"></textarea>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});


var UnderstandButton = React.createClass({
    render: function() {
        var cx = React.addons.classSet;

        var classes1 = cx({
            'col': true;
            'col-xs-4': true;
        });

        var classes2 = cx({
            'btn': true;
            'btn-block': true;
            'btn-success': this.props.commentType === 'SUCCESS';
            'btn-warning': this.props.commentType === 'WARNING';
            'btn-failure': this.props.commentType === 'FAILURE';
            'understand-button': true;
        });

        var classes3 = cx({
            'glyphicon': true;
            'glyphicon-ok-sign': this.props.commentType === 'SUCCESS';
            'glyphicon-minus-sign': this.props.commentType === 'WARNING';
            'glyphicon-remove-sign': this.props.commentType === 'FAILURE';
        });

        var comment = cx {{
            "I understand.": this.props.commentType === 'SUCCESS';
            "I sort of understand.": this.props.commentType === 'WARNING';
            "I don't understand.": this.props.commentType === 'FAILURE';
        }};

        return (
            <div className="{classes1}">
            <button type="button" className={classes2}>
            <span className={classes3} aria-hidden="true"></span>
            <span className="sr-only">{this.props.comment}</span>
            </button>
            </div>
            );
    }
});

var Comment = React.createClass({
    render: function() {
        var cx = React.addons.classSet;

        var classes = cx({
            'col': true,
            'col-xs-1': true,
            'green-block': this.props.commentType === 'SUCCESS',
            'yellow-block': this.props.commentType === 'WARNING',
            'red-block': this.props.commentType === 'FAILURE'
        });

        return (
            <div className="row feedback-row">
                <div className={classes}>
                    <span className="sr-only">{this.props.commentType}</span>
                </div>
                <div className="col col-xs-9">
                    <p>{this.props.text}</p>
                    <p className="timestamp">{this.props.timestamp}</p>
                </div>
            </div>
        );
    }
});

var CommentListPage = React.createClass({
    render: function() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col col-xs-12 current-time">
                            <h4>
                                <p className="text-center">11:23 a.m.</p>
                            </h4>
                        </div>
                    </div>

                    <Comment text={"This is a comment"} timestamp={"3:22"} commentType={'SUCCESS'} />
                    <Comment text={"This is another comment"} timestamp={"3:42"} commentType={'WARNING'} />
                    <Comment text={"This is a 3rd comment"} timestamp={"5:22"} commentType={'FAILURE'} />
                    <Comment text={"This is a comment"} timestamp={"3:28"} commentType={'SUCCESS'} />
                </div>
            </div>
        );
    }
});

var App = React.createClass({
    render: function() {
      var display;
      if (true) {
        display = <CommentFeedbackPage />;
      } else {
        display = <CommentListPage />;
      }
        return (
            <div>
            {display}
            </div>
        );
    }
});

$(function() {
    React.render(
        <App />,
        document.getElementById('app')
    );


    var commentsList = new Firebase("https://lecturegauge.firebaseio.com/").child("commentsList");

    var getCurrentTime = function() {
        var currentdate = new Date();
        var datetime = "Last Sync: " + currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
    }
    var upVote = function() {
        time = getCurrentTime();
        level = "green";

    }

    var noVote = function() {
        time = getCurrentTime();
        level = "yellow";
    }

    var downVote = function() {
        time = getCurrentTime();
        level = "red";
    }

});
