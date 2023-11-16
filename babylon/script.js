window.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('renderCanvas');
    var engine = new BABYLON.Engine(canvas, true);

    var createScene = async function () {
        var scene = new BABYLON.Scene(engine);
        var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0,0,5), scene);
        camera.attachControl(canvas, true);

        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

        // Load your model
        BABYLON.SceneLoader.ImportMesh("", "", "Statue_clean.glb", scene, function (newMeshes) {
            var model = newMeshes[0];
            model.position = BABYLON.Vector3.Zero(); // Adjust position as needed
        });

        // const result = await SceneLoader.ImportMeshAsync(null, "", "Statue_clean.glb", this._scene);

        // let env = result.meshes[0];
        // let allMeshes = env.getChildMeshes();

        return scene;

        
    };

    var scene = createScene();

    engine.runRenderLoop(function () {
        scene.render();
    });

    window.addEventListener('resize', function () {
        engine.resize();
    });
});
