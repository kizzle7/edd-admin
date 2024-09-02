import React from "react";
import svg from "../../assets/svgs/export.svg";
function Export({ text }) {
  
  return (
    <div>
      <span
        class="flex items-center px-2 py-1 ml-6 text-sm font-medium border rounded-md cursor-pointer lg:ml-2 font-SFProDisplay text-foundationGrey900 border-foundationGreyG30 bg-foundationGreyG20"
        style="height: 1.875rem"
      >
        <span>{text}</span>
        <span class="ml-2">
          <img src={svg} width={100} />
        </span>
      </span>
    </div>
  );
}

export default Export;

{
  /* <script>
import FlexWrapper from "@/components/UI/Wrappers/FlexWrapper.vue";
export default {
  props: ["text"],
  components: { FlexWrapper },
  methods: {
    triggerDownload() {
      this.$emit("download");
    },
  },
};
</script>

<style></style> */
}
