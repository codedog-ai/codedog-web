<template>
	<DropdownMenuRoot>
		<DropdownMenuTrigger asChild>
			<Button variant="ghost" size="icon">
				<ColorModeToggleIcon />
			</Button>
		</DropdownMenuTrigger>

		<DropdownMenuContent>
			<ColorModeToggleRadioGroup />
		</DropdownMenuContent>
	</DropdownMenuRoot>
</template>
