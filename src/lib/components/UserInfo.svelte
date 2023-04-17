<script>
  import Avatar from "./Avatar.svelte";
  import Input from "./ui/Input.svelte";

  export let errors = {};
  export let name = "";
  export let seed = 0;
  export let color = "red";
</script>

<div class="flex">
  <div class="cursor-pointer w-[128px]">
    <Avatar {seed} {color} canEdit={true} />

    <div class="text-center text-sm text-gray-500">
      Click to regenerate avatar
    </div>
  </div>

  <div class="flex-grow pl-7 pt-5">
    <Input
      type="text"
      label="Username"
      name="userName"
      value={name}
      error={errors?.userName?.join(", ")}
    />
  </div>
</div>
