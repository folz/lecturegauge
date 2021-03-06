/* global React */

var firebaseApp = "https://lecturegauge.firebaseio.com/";

var cx = React.addons.classSet;
var Animate = React.addons.CSSTransitionGroup;

var lectureStart = moment("2014-11-16T13:00:00-05:00");
var lectureEnd = moment("2014-11-16T15:00:00-05:00");

var CommentFeedbackPage = React.createClass({
    handleClick: function(evt) {
        if (evt.target.value === this.state.commentType) {
            this.setState({'commentType': null});
        } else {
            this.setState({'commentType': evt.target.value});
        }
    },

    handleSubmit: function(evt){
        evt.preventDefault();

        var comment = {
            'commentType': this.state.commentType,
            'text': $("textarea", evt.target).val(),
            'timestamp': moment().format(),
            'vote': 0,
            'stamp': ''
        };

        this.props.handleCommentSubmit(comment);

        this.setState(this.getInitialState());
    },

    getInitialState: function() {
        return {
            'text': null,
            'commentType': null,
            'timestamp': null
        };
    },

    render: function() {
        var placeholder = cx({
            "Comment or ask a question": this.state.commentType === 'SUCCESS',
            "What do you need clarified?": this.state.commentType === 'WARNING',
            "What do you need help understanding": this.state.commentType === 'FAILURE'
        });

        var actionText= cx({
            "Make a comment": this.state.commentType === 'SUCCESS',
            "Ask for clarification": this.state.commentType === 'WARNING',
            "Ask for help": this.state.commentType === "FAILURE"
        });

        var commentBox;
        if (this.state.commentType !== null) {
            commentBox = (
                <div className="row comment-row">
                    <div className="col-xs-12">
                        <form className="form-horizontal" role="form" onSubmit={this.handleSubmit}>
                            <textarea className="form-control" rows="3" placeholder={placeholder}></textarea>
                            <button type="submit" className="btn btn-block btn-primary">{actionText}</button>
                        </form>
                    </div>
                </div>
            );
        }

        return (
        <div className="hidden-md hidden-lg">
            <div className="row spacer">
                <div className="col col-xs-4">
                    <button type="button" className="btn btn-block btn-success understand-button" onClick={this.handleClick} value="SUCCESS">
                        <span className="glyphicon glyphicon-ok-sign glyphiconDec" aria-hidden="true"></span>
                        <span className="sr-only">I understand.</span>
                    </button>
                </div>
                <div className="col col-xs-4">
                    <button type="button" className="btn btn-block btn-warning understand-button" onClick={this.handleClick} value="WARNING">
                        <span className="glyphicon glyphicon-minus-sign glyphiconDec" aria-hidden="true"></span>
                        <span className="sr-only">I sort of understand.</span>
                    </button>
                </div>
                <div className="col col-xs-4">
                    <button type="button" className="btn btn-block btn-danger understand-button" onClick={this.handleClick} value="FAILURE">
                        <span className="glyphicon glyphicon-remove-sign glyphiconDec" aria-hidden="true"></span>
                        <span className="sr-only">I don't understand.</span>
                    </button>
                </div>
            </div>
            <Animate transitionName="scrollin">
                {commentBox}
            </Animate>
        </div>
        );
    }
});

var Comment = React.createClass({
	 handleClick: function(evt) {
         console.log(this);
         comment = this.props.data;
         if (~evt.target.className.indexOf('upvote')){
             comment.vote++;
         } else {
             comment.vote--;
         }
         this.props.handleUpvote(comment);
     },
    render: function() {
        var classes = cx({
            "col": true,
            "col-xs-1": true,
            "green-block": this.props.data.commentType === 'SUCCESS',
            "yellow-block": this.props.data.commentType === 'WARNING',
            "red-block": this.props.data.commentType === 'FAILURE'
        });

        var srCommentText = cx({
            "I understand.": this.props.data.commentType === 'SUCCESS',
            "I'm a little confused.": this.props.data.commentType === 'WARNING',
            "I don't understand.": this.props.data.commentType === 'FAILURE'
        });

        return (
            <div className="row feedback-row">
                <div className={classes}>
                <button type="button" className="btn btn-default upvote"  onClick={this.handleClick} value={this.props.data._id}>
                	<span className="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span>
            	</button>
                 <button type="button" className="btn btn-default downvote" onClick={this.handleClick} value={this.props.data._id}>
                 	<span className="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span>
                 </button>
                 <p className="vote-count">{this.props.data.vote}</p>
                 <span className="sr-only">{srCommentText}</span>
                </div>
                <div className="col col-xs-9 boxder">
                    <p className="scrollz">{this.props.data.text}</p>
                    <p className="timestamp">{this.props.data.timestamp}</p>
                </div>

            </div>
        );
    }
});

var CommentBarGraph = React.createClass({
    chart: null,

    componentDidMount: function() {
        this.chart = new Highcharts.Chart({
            chart: {
                renderTo: 'comments-graph',
                type: 'column'
            },
  //     Highcharts.theme = {
  //  colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']},
            title: {
                text: "Students Comments per 5 Minute Intervals"
            },
            xAxis: {
                categories: []
            },
            yAxis: {
                title: {
                    text: 'Comments'
                },
                stackLabels: {
                  enabled: true,
                    style: {
                      fontWeight: 'bold',
                      color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray',
                  }
                },
            },
            plotOptions: {
                column: {
                  stacking: 'normal',
                  dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black, 0 0 3px black'
                    }
                  }
                }
            },
            series: [{
                name: "Understand",
                data: [],
                color: '#47a447'
            },
            {
                name: "Kind of Understand",
                data:[],
                color: '#ed9c28'
            },
            {
                name: "Don't Understand",
                data:[],
                color: '#d9534f'
            }
            ]
        });
    },

    componentDidUpdate: function() {
        var incrementsSinceStart = Math.floor(lectureEnd.diff(lectureStart, 'm') / 5);
        var successCount = {};
        var warningCount = {};
        var failureCount = {};
        for (var i = 0; i < incrementsSinceStart; i++) {
            successCount[i] = 0;
            warningCount[i] = 0;
            failureCount[i] = 0;
        }

        this.props.data.forEach(function(comment) {
            var time = moment(comment.timestamp);
            if (time.diff(lectureEnd) > 0) {
                // Someone commented after the lecture ended
                return;
            }

            var increment = Math.floor(time.diff(lectureStart, 'm') / 5);
            if (comment.commentType === 'SUCCESS') {
              successCount[increment]++;
            }else if(comment.commentType === 'WARNING') {
              warningCount[increment]++;
            }
            else {
              failureCount[increment]++;
            }
        });

        var successBlocks = [];
        for (var key in successCount) {
            if (successCount.hasOwnProperty(key)) {
                successBlocks.push({block: key, count: successCount[key]});
            }
        }
        var warningBlocks = [];
        for (var key in warningCount) {
            if (warningCount.hasOwnProperty(key)) {
                warningBlocks.push({block: key, count: warningCount[key]});
            }
        }
        var failureBlocks = [];
        for (var key in failureCount) {
            if (failureCount.hasOwnProperty(key)) {
                failureBlocks.push({block: key, count: failureCount[key]});
            }
        }

        successBlocks = successBlocks.sort(function(a, b) { return a - b; });

        var sortedSuccessBlocks = successBlocks.map(function(block) {
            return block.key;
        });

        var sortedSuccessBlockCount = successBlocks.map(function(block) {
            return block.count;
        });

        warningBlocks = warningBlocks.sort(function(a, b) { return a - b; });

        var sortedWarningBlocks = warningBlocks.map(function(block) {
            return block.key;
        });

        var sortedWarningBlockCount = warningBlocks.map(function(block) {
            return block.count;
        });

        failureBlocks = failureBlocks.sort(function(a, b) { return a - b; });

        var sortedFailureBlocks = failureBlocks.map(function(block) {
            return block.key;
        });

        var sortedFailureBlockCount = failureBlocks.map(function(block) {
            return block.count;
        });

        //incrementBlocks = incrementBlocks.sort(function(a, b) { return a - b; });

        //var sortedBlocks = incrementBlocks.map(function(block) {
            //return block.key;
        //});

        //var sortedBlockCount = incrementBlocks.map(function(block) {
            //return block.count;
        //});

        if (this.chart) {
            this.chart.xAxis[0].setCategories(sortedSuccessBlocks);
            this.chart.series[0].setData(sortedSuccessBlockCount);
            //this.chart.xAxis[1].setCategories(sortedWarningBlocks);
            this.chart.series[1].setData(sortedWarningBlockCount);
            //this.chart.xAxis[2].setCategories(sortedFailureBlocks);
            this.chart.series[2].setData(sortedFailureBlockCount);
          //  this.chart.xAxis[0].setCategories(sortedBlocks);
          //  this.chart.series[0].setData(sortedBlockCount);
        }
    },

    render: function() {
        return (
            <div id="comments-graph" className="hidden-xs hidden-sm" style={{"width": "100%", "height": "200px"}}></div>
        );
    }
});

var CommentList = React.createClass({
    render: function() {
        var commentNodes = this.props.data.sort(function (a, b) {
            return moment(b.timestamp).unix() - moment(a.timestamp).unix();
        }).map(function(comment, index) {
            return <Comment handleUpvote={this.props.handleUpvote} key={index} idx={index} data={comment} />
        }.bind(this));

        return (
        <div>
            <div className="hidden-xs hidden-sm">
                <button type="button" className="btn btn-info" onClick={this.props.hidePastQuestions}>Hide past questions.</button>
                <p></p>
            </div>

            {commentNodes}
        </div>
        );
    }
});


var ProgressBarElement = React.createClass({

    componentDidMount: function() {
        var now = moment();

        var progressBar = new ProgressBar.Line('#progbar', {
                              color:"#5cb85c",
                              strokeWidth: 5,
                              trailColor: "#f4f4f4",
                              duration: (lectureEnd - lectureStart) * 10,
                              easing: "easeIn",
                            });

        progressBar.animate(1);
    },

    render: function() {
        return (
            <div id="progbar"></div>
            );
    }

});

var App = React.createClass({
    mixins: [ReactFireMixin],

    handleCommentSubmit: function(comment) {
        var comments = this.state.data;
        comments.push(comment);
        this.setState(comments);

        var commentRef = this.firebaseRefs["data"].push(comment);
        var commentID = commentRef.key();

        comment['stamp'] = commentID;
        commentRef.update(comment);
    },

    hidePastQuestions: function() {
        this.setState(this.getInitialState());
    },

    handleUpvote: function(comment) {
        console.log(comment);

        var commentRef = this.firebaseRefs["data"].child(comment.stamp);
        commentRef.update({
            'vote': comment.vote
        });

        var comments = this.state.data;
        comments.forEach(function(oldComment) {
            if (oldComment.stamp === comment.stamp) {
                oldComment.vote = comment.vote;
            }
        })
        this.setState(comments);
    },

    getInitialState: function() {
        return {'data': []};
    },

    componentWillMount: function() {
        this.bindAsArray(new Firebase(firebaseApp + "comments"), "data");
    },

    render: function() {
        console.table(this.state.data);

        return (
            <div className="container">
                <div className="row spacerTime">
                    <div className="col col-xs-12 current-time">
                        <p className="text-center"></p>
                    </div>
                </div>

                <CommentFeedbackPage handleCommentSubmit={this.handleCommentSubmit} />
                <CommentBarGraph data={this.state.data} />
                <CommentList hidePastQuestions={this.hidePastQuestions} handleUpvote={this.handleUpvote} data={this.state.data} />
            </div>
        );
    }
});

$(function() {
    React.render(
        <App />,
        document.getElementById('app')
    );
});
