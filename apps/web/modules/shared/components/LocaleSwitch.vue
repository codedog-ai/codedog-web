<template>
	<DropdownMenuRoot>
		<DropdownMenuTrigger asChild>
			<Button variant="ghost" size="icon">
				<Icon name="language" class="h-4 w-4" />
			</Button>
		</DropdownMenuTrigger>

		<DropdownMenuContent>
			<LocaleSwitchRadioGroup />
		</DropdownMenuContent>
	</DropdownMenuRoot>
</template>
