<template>
  <div id="app">
    <div class="header">
      <h1>SSR Protocol Decoder</h1>
    </div>

    <div class="main">
      <el-input
        type="textarea"
        :rows="5"
        placeholder="Please input"
        v-model="ssrRules"
        resize="none"
        width="80%"
      ></el-input>

      <button
        class="clip-btn"
        data-clipboard-snippet
        data-clipboard-target="#code"
        @mouseleave="showToolTip = false"
      >
        <img class="clippy" width="14" src="./assets/clippy.svg" alt="Copy to clipboard"> Copy Results
      </button>
      <pre v-highlightjs="result" class="result">
        <code class="bash code" id="code"></code>
      </pre>
    </div>
  </div>
</template>

<script>
import ClipboardJS from "clipboard";
let ssrPrefix = "ssr://";
let ssPrefix = "ss://";
export default {
  name: "app",
  data() {
    return {
      ssrRules: `ss://cmM0LW1kNTp4eHh4QGNuMy5qdW5qaWUueHl6OjExOTE4
ss://cmM0LW1kNTp4eHh4QGNuMi5qdW5qaWUueHl6OjExOTE4
ssr://aGsxLmp1bmppZS54eXo6OTk1OmF1dGhfYWVzMTI4X21kNTpyYzQtbWQ1OnRsczEuMl90aWNrZXRfYXV0aDpSMHRUVEVOS1VuY3gvP29iZnNwYXJhbT1NVEV1WVhVUXVkMmx1Wkc5M2MzVndaR0YwWlM1amIyMCZwcm90b3BhcmFtPU1URTVNVHVka2c0UmtoMyZyZW1hcmtzPVNFeCZncm91cD1SR0Z5YTBEUXdSdw==
ssr://aGsyLmp1bmppZS54eXo6OTk1OmF1dGhfYWVzMTI4X21kNTpyYzQtbWQ1OnRsczEuMl90aWNrZXRfYXV0aDpSMHRUVEVOS1VuY3gvP29iZnNwYXJhbT1NVEV1WVhVUXVkMmx1Wkc5M2MzVndaR0YwWlM1amIyMCZwcm90b3BhcmFtPU1URTVNVHVka2c0UmtoMyZyZW1hcmtzPVNFeCZncm91cD1SR0Z5YTBEUXdSdw==`
    };
  },
  computed: {
    result() {
      try {
        if (
          ~this.ssrRules.indexOf(ssrPrefix) ||
          ~this.ssrRules.indexOf(ssPrefix)
        ) {
          let rules = this.ssrRules.match(/ssr?:\/\/\w+/g);
          return rules
            .map(rule => {
              try {
                if (~rule.indexOf(ssrPrefix)) {
                  return ssrPrefix + window.atob(rule.replace(ssrPrefix, ""));
                } else {
                  return ssPrefix + window.atob(rule.replace(ssPrefix, ""));
                }
              } catch (e) {
                // eslint-disable-next-line
                console.error(e);
                return "";
              }
            })
            .filter(rule => rule)
            .join("\n");
        } else {
          return window.atob(this.ssrRules);
        }
      } catch (e) {
        // eslint-disable-next-line
        console.error(e);
        return "转换出错";
      }
    }
  },
  mounted() {
    this.initClipbord();
  },
  methods: {
    initClipbord() {
      var clipboardSnippets = new ClipboardJS("[data-clipboard-snippet]", {});

      clipboardSnippets.on("success", e => {
        e.clearSelection();
        this.$message({
          message: "Copied!",
          type: "success"
        });
      });

      clipboardSnippets.on("error", e => {
        this.$message({
          message: this.fallbackMessage(e.action),
          type: "error"
        });
      });
    },
    // Simplistic detection, do not use it in production
    fallbackMessage(action) {
      var actionMsg = "";
      var actionKey = action === "cut" ? "X" : "C";

      if (/iPhone|iPad/i.test(navigator.userAgent)) {
        actionMsg = "No support :(";
      } else if (/Mac/i.test(navigator.userAgent)) {
        actionMsg = "Press ⌘-" + actionKey + " to " + action;
      } else {
        actionMsg = "Press Ctrl-" + actionKey + " to " + action;
      }

      return actionMsg;
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  .header {
    h1 {
      color: #1ac1a1;
    }
  }

  .main {
    .clip-btn {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      align-self: center;
      margin-top: 45px;
      padding: 6px 12px;
      font-size: 14px;
      color: #333;
      white-space: nowrap;
      cursor: pointer;
      background-color: #eee;
      background-image: linear-gradient(#fcfcfc, #eee);
      border: 1px solid #d5d5d5;
      border-radius: 3px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      -webkit-appearance: none;
      -webkit-transition: opacity 0.3s ease-in-out;
      -o-transition: opacity 0.3s ease-in-out;
      transition: opacity 0.3s ease-in-out;

      .clippy {
        margin-right: 8px;
      }
    }

    .result {
      position: relative;
      .code {
        text-align: left;
        position: relative;
      }
    }
  }
}
</style>
