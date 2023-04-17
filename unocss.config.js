export default {
  theme: {
    fontFamily: {
      // imported in layout
      // sans: ['"Source Sans Pro"', "sans-serif"],
    },
  },

  rules: [
    [
      "text-funky",
      {
        background: `linear-gradient(
                      90deg,
                      rgba(255, 197, 0, 1) 0%,
                      rgba(250, 66, 82, 1) 85%,
                      rgba(247, 1, 123, 1) 100%
                    )`,
        "background-clip": "text",
        "-webkit-background-clip": "text",
        "-webkit-text-fill-color": "transparent",
        display: "inline-block",
      },
    ],
    [
      "bg-dark",
      {
        background: "#4D4D4D",
      },
    ],
    [
      "bg-action",
      {
        background: "#B22222",
      },
    ],
    [
      "text-action",
      {
        color: "#B22222",
      },
    ],
  ],

  shortcuts: {
    btn: "bg-action border-none m-0 px-30px py-8px text-white text-14px rounded-3px text-shadow hover:bg-action cursor-pointer transition-all duration-100",
    "page-title": "text-funky text-6 font-bold",
    input:
      "p-5 bg-dark rounded-lg shadow-sm shadow-black/30 block w-full text-white text-2xl focus:border-[#0095f6] focus:outline-none",
    label: "text-[#eee] shadow block text-left mb-4px cursor-pointer",
  },
};
