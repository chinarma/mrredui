// 为了保证版本一致，请复制我的 package.json 到你的项目，并把 name 改成你的库名
import esbuild from "rollup-plugin-esbuild";
import vue from "rollup-plugin-vue";
import scss from "rollup-plugin-scss";
import dartSass from "sass";
import { terser } from "rollup-plugin-terser";
import alias from "@rollup/plugin-alias";
import path from "path";
import resolve from "rollup-plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";

import copy from "rollup-plugin-copy";
import glob from "glob";

// 获得所有组件 {"button":"./src/lib/button/index.vue"}
const componentsObject = glob
    .sync(`src/lib/**/index.vue`, {
        dot: true,
    })
    .map((x) => path.resolve(x))
    .map((x) => path.dirname(x).split(path.sep).pop())
    .reduce((p, name) => {
        p[name] = `./src/lib/${name}/index.vue`;
        return p;
    }, {});

const configFn = (name) => ({
    plugins: [
        scss({ include: /\.scss$/, sass: dartSass }),

        vue({
            include: /\.vue$/,
        }),
        esbuild({
            include: /\.[jt]s$/,
            minify: process.env.NODE_ENV === "production",
            target: "es2015",
        }),

        // resolve({}), //打包绝对路径的第三方包
        replace({
            preventAssignment: true,

            "process.env.NODE_ENV": JSON.stringify("production"), //处理process环境的;
        }),
    ],
    external: [
        //外部库， 使用'umd'文件时需要先引入这个外部库
        "vue",
    ],
});

const comConfigs = Object.keys(componentsObject).map((name) => {
    const config = configFn(name);
    config.input = [componentsObject[name]];
    config.output = {
        file: "dist/lib/es/" + name + ".js",
        format: "es",
        plugins: [terser()],
    };
    return config;
});

const umdConfig = {
    input: "src/lib/index.ts",
    external: ["axios", "lodash", "vue"], //排除axios 不打包到本包内

    output: [
        {
            globals: {
                vue: "Vue",
                axios: "axios",
            },
            name: "mrredui",
            file: "dist/lib/mrredui.js",
            format: "umd",
            plugins: [terser()],
        },
        {
            name: "mrredui",
            file: "dist/lib/mrredui.esm.js",
            format: "es",
            plugins: [terser()],
        },
    ],
    //顺序很重要！
    plugins: [
        copy({
            targets: [
                {
                    src: "src/lib/*",
                    dest: "dist/lib/src/",
                },
            ],
        }),
        // 如果第三方包没有默认default 使用commonjs 模式导入
        // commonjs({
        //     include: /node_modules/,
        // }),
        scss({ include: /\.scss$/, sass: dartSass }),

        vue({
            include: /\.vue$/,
        }),
        esbuild({
            include: /\.[jt]s$/,
            minify: process.env.NODE_ENV === "production",
            target: "es2015",
        }),

        // resolve({}), //打包绝对路径的第三方包
        replace({
            preventAssignment: true,

            "process.env.NODE_ENV": JSON.stringify("production"), //处理process环境的;
        }),
        // alias({
        //     entries: [
        //         {
        //             find: "@", // 别名名称，作为依赖项目需要使用项目名
        //             replacement: path.resolve(__dirname, "src"),
        //             customResolver: resolve({
        //                 extensions: [".js", ".jsx", ".vue", ".sass", ".scss"],
        //             }),
        //         },
        //     ],
        // }),
    ],
};

export default [umdConfig, ...comConfigs];
