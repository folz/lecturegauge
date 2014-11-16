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
                    <div className="col col-xs-4">
                        <button type="button" className="btn btn-block btn-success understand-button">
                            <span className="glyphicon glyphicon-ok-sign" aria-hidden="true"></span>
                            <span className="sr-only">I understand.</span>
                        </button>
                    </div>
                    <div className="col col-xs-4">
                        <button type="button" className="btn btn-block btn-warning understand-button">
                            <span className="glyphicon glyphicon-minus-sign" aria-hidden="true"></span>
                            <span className="sr-only">I sort of understand.</span>
                        </button>
                    </div>
                    <div className="col col-xs-4">
                        <button type="button" className="btn btn-block btn-danger understand-button">
                            <span className="glyphicon glyphicon-remove-sign" aria-hidden="true"></span>
                            <span className="sr-only">I don't understand.</span>
                        </button>
                    </div>
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

                <div className="row feedback-row">
                    <div className="col col-xs-1 green-block">
                        <span className="sr-only">I understand.</span>
                    </div>
                    <div className="col col-xs-9">
                        <p>This explanation was great</p>
                        <p className="timestamp">3:22</p>
                    </div>
                </div>

                <div className="row feedback-row">
                    <div className="col col-xs-1 yellow-block">
                        <span className="sr-only">I sort of understand.</span>
                    </div>
                    <div className="col col-xs-9">
                        <p>I don't fully understand this.</p>
                        <p className="timestamp">3:47</p>
                    </div>
                </div>

                <div className="row feedback-row">
                    <div className="col col-xs-1 red-block">
                        <span className="sr-only">I don't understand.</span>
                    </div>
                    <div clasName="col col-xs-9">
                        <p> I have no clue what's going on.</p>
                        <p className="timestamp">4:20</p>
                    </div>
                </div>

                <div className="row feedback-row">
                    <div className="col col-xs-1 green-block">
                        <span className="sr-only">I understand.</span>
                    </div>
                    <div className="col col-xs-9">
                        <p>This was really clear!</p>
                        <p className="timestamp">5:14</p>
                    </div>
                </div>


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


    // var commentsList = new Firebase("https://lecturegauge.firebaseio.com/").child("commentsList");

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
