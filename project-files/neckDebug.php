<!DOCTYPE html>
<html>
    <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/phaser/2.2.2/phaser.js"></script>
    </head>
    <body>
        <script>
        var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '',{preload: preload, create: create, update:update, render: render});

        var rope, debugKey, shouldDebug = false;

        function preload() {
            game.load.image('snake', 'http://jakewebdev.local/ZebraGame/img/giraffeNeck.png');
        }

        function create() {
            var count = 0;
            var points = [];
            //for (var i = 0; i < 2; i++) {
                points.push(new Phaser.Point(100, 100));
                points.push(new Phaser.Point(100, 100));
            //}

            rope = game.add.rope(0,0,'snake', null, points);

            rope.updateAnimation = function() {
                this.points[1].y = game.input.mousePointer.y;
                this.points[1].x = game.input.mousePointer.x;
            };


        }

        function update() {

        }

        function render() {
        }

        </script>
    </body>
</html>